document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const amount = document.getElementById('amount').value;
  
      const response = await fetch('/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
  
      if (response.ok) {
        const order = await response.json();
  
        const options = {
          key: "rzp_test_Gdm3f2qDpuZ28T",
          amount: order.amount,
          currency: order.currency,
          name: 'Razorpay Payment',
          description: 'Payment for Order',
          order_id: order.id,
          handler: function (response) {
            alert('Payment successful!');
          },
          prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '+1234567890',
          },
        };
  
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        alert('Failed to create order');
      }
    });
  });
  