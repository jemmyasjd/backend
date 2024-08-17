const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function Payment(req,res){
    try {
        const host = req.get('host'); // Get the host from the request
        const protocol = req.protocol; // Get the protocol (http or https)
      
        const { totalAmount, email } = req.body;
    
        if (!totalAmount) {
          return res.status(400).json({ error: 'Total amount is required' });
        }
    
        const product = await stripe.products.create({
          name: "Total Amount",
          images: ["https://cdn-icons-png.freepik.com/512/3/3729.png"]
        });
    
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: totalAmount * 100, // Convert to cents/paise
          currency: 'inr',
        });
    
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: price.id,
              quantity: 1,
            }
          ],
          mode: 'payment',
          success_url: `${protocol}://${host}/`,  // Redirect to homepage
          cancel_url: `${protocol}://${host}/`, 
          customer_email: email,
        });
    
        res.status(200).json({ url: session.url });
      } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports= {Payment};