const express = require('express');
const Razorpay = require('razorpay');
const path = require('path');

const app = express();
const razorpay = new Razorpay({
  key_id: "rzp_test_Gdm3f2qDpuZ28T",
  key_secret: "EnVW8QQ9FIt4j9k8T9pT1YTS",
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'order_receipt',
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
