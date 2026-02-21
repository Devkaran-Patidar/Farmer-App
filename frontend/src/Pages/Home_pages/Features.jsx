import "./Features.css";

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">
        <h2>Why Choose AgroMart?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <p className="feature-icon" >🌱</p>
            <h3>Farm Fresh Quality</h3>
            <p>Directly sourced from local farms daily - premium quality you can trust.</p>
          </div>

          <div className="feature-card">
            <p className="feature-icon">⚡</p>
            <h3>Scheduled & Reliable Delivery</h3>
            <p>Order anytime - we deliver to your home scheduled and efficiently.</p>
          </div>

          <div className="feature-card">
            <p className="feature-icon">💰</p>
            <h3>Best Prices & Offers</h3>
            <p>Competitive pricing - quality produce without high costs.</p>
          </div>
          <div className="feature-card">
            <p className="feature-icon">✔️</p>
            <h3>Quality Assured</h3>
            <p>Every product is carefully inspected and quality-checked before Packing.</p>
          </div>
          <div className="feature-card">
            <p className="feature-icon">📱</p>
            <h3>Easy & Secure App</h3>
            <p>User-friendly app for easy and seamless shopping.</p>
          </div>
          <div className="feature-card">
            <p className="feature-icon">🔒</p>
            <h3>Secure Payments</h3>
            <p>Multiple payment options with bank-grade security. Your transactions are always protected</p>
          </div>
        </div>
      </div>
    </section>
  );
}
