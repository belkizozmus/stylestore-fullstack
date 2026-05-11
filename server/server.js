import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.use('/uploads', express.static('public/uploads'));

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, 
    trustServerCertificate: true
  }
};

sql.connect(dbConfig).then(() => {
  console.log("✅ SQL Server'a başarıyla bağlanıldı!");
}).catch(err => {
  console.error("❌ Veritabanı bağlantı hatası:", err);
});

//ÜRÜN ENDPOINT
app.get('/api/products', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT p.Id, p.Name, p.Description, p.Price, p.ImageUrl, c.Name as CategoryName,
      (SELECT SizeName FROM ProductSizes WHERE ProductId = p.Id AND StockQuantity > 0 FOR JSON PATH) as Sizes
      FROM Products p JOIN Categories c ON p.CategoryId = c.Id
    `);
    const products = result.recordset.map(prod => ({
      ...prod,
      Sizes: prod.Sizes ? JSON.parse(prod.Sizes).map(s => s.SizeName) : []
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().input('productId', sql.Int, req.params.id)
      .query(`SELECT p.*, c.Name as CategoryName FROM Products p JOIN Categories c ON p.CategoryId = c.Id WHERE p.Id = @productId`);
    if (result.recordset.length > 0) res.json(result.recordset[0]);
    else res.status(404).json({ message: "Ürün bulunamadı" });
  } catch (err) {
    res.status(500).json({ message: "Hata", error: err.message });
  }
});

//SİPARİŞ ENDPOINT

app.get('/api/orders/search', async (req, res) => {
  const { email, phone } = req.query;

  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    
    let query = `SELECT Id, Email, Phone, Address, TotalAmount, PaymentMethod, OrderDate FROM Orders WHERE 1=1`;

    if (email) {
      query += ` AND Email = @email`;
      request.input('email', sql.NVarChar(100), email);
    }
    if (phone) {
      query += ` AND Phone = @phone`;
      request.input('phone', sql.NVarChar(50), phone);
    }

    const result = await request.query(query);
    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ message: "No orders found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error during search." });
  }
});

app.post('/api/orders', async (req, res) => {
  const { email, phone, address, totalAmount, paymentMethod, items } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const orderResult = await pool.request()
      .input('email', sql.NVarChar(100), email)
      .input('phone', sql.NVarChar(50), phone)
      .input('address', sql.NVarChar(sql.MAX), address)
      .input('totalAmount', sql.Decimal(10, 2), totalAmount)
      .input('paymentMethod', sql.NVarChar(50), paymentMethod || 'Not Specified')
      .query(`INSERT INTO Orders (Email, Phone, Address, TotalAmount, PaymentMethod) OUTPUT INSERTED.Id VALUES (@email, @phone, @address, @totalAmount, @paymentMethod)`);

    const newOrderId = orderResult.recordset[0].Id;
    for (const item of items) {
      await pool.request()
        .input('orderId', sql.Int, newOrderId)
        .input('productId', sql.Int, item.productId)
        .input('size', sql.VarChar(10), item.size)
        .input('quantity', sql.Int, item.quantity)
        .input('price', sql.Decimal(10, 2), item.price)
        .query(`INSERT INTO OrderItems (OrderId, ProductId, Size, Quantity, Price) VALUES (@orderId, @productId, @size, @quantity, @price)`);
    }
    res.status(201).json({ message: "Sipariş başarıyla oluşturuldu!", orderId: newOrderId });
  } catch (err) {
    res.status(500).json({ message: "Sipariş oluşturulamadı", error: err.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    if (isNaN(req.params.id)) return res.status(400).json({ message: "Invalid ID." });

    const orderResult = await pool.request().input('orderId', sql.Int, req.params.id)
      .query(`SELECT Id, Email, Phone, Address, TotalAmount, PaymentMethod, OrderDate FROM Orders WHERE Id = @orderId`);

    if (orderResult.recordset.length === 0) return res.status(404).json({ message: "Order not found." });

    const itemsResult = await pool.request().input('orderId', sql.Int, req.params.id)
      .query(`SELECT oi.Size, oi.Quantity, oi.Price, p.Name, p.ImageUrl FROM OrderItems oi JOIN Products p ON oi.ProductId = p.Id WHERE oi.OrderId = @orderId`);

    const order = orderResult.recordset[0];
    order.Items = itemsResult.recordset;
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//İADE

app.post('/api/returns', async (req, res) => {
  const { orderId, reason, iban } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    

    const checkResult = await pool.request()
      .input('orderId', sql.Int, orderId)
      .query(`SELECT Id FROM Returns WHERE OrderId = @orderId`);

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ message: "A return request already exists for this order." });
    }

    await pool.request()
      .input('orderId', sql.Int, orderId)
      .input('reason', sql.NVarChar(100), reason)
      .input('iban', sql.NVarChar(30), iban)
      .query(`
        INSERT INTO Returns (OrderId, Reason, Iban) 
        VALUES (@orderId, @reason, @iban)
      `);

    res.status(201).json({ message: "Return request submitted successfully." });

  } catch (err) {
    console.error("❌ Return error:", err);
    res.status(500).json({ message: "Failed to submit return request", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});