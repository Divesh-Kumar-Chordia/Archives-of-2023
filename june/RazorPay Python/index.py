import razorpay

# Initialize the Razorpay client with your API credentials
client = razorpay.Client(auth=('rzp_test_Gdm3f2qDpuZ28T', 'EnVW8QQ9FIt4j9k8T9pT1YTS'))

# Create a new order
order_amount = 1000  # Amount in paise (e.g., 1000 paise = ₹10)
order_currency = 'INR'
order_receipt = 'order_12345'  # A unique identifier for the order
response = client.order.create(
    {
        'amount': order_amount,
        'currency': order_currency,
        'receipt': order_receipt,
        'payment_capture': '1'  # Capture the payment immediately
    }
)

# Retrieve the order ID and payment URL from the response
order_id = response['id']
payment_url = response['short_url']

# Redirect the user to the payment URL
print("Please complete the payment by visiting the following link:")
print(payment_url)

# Verify the payment status
payment_id = 'YOUR_PAYMENT_ID'  # Replace with the actual payment ID
payment_info = client.payment.fetch(payment_id)
payment_status = payment_info['status']

# Handle the payment status accordingly
if payment_status == 'captured':
    print("Payment successful!")
else:
    print("Payment failed or pending.")
