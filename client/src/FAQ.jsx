import React from "react";
import Footer from "./Footer";
const FAQ = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our store, select your desired items, and proceed to checkout. Follow the on-screen instructions to complete your order."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, UPI, PayPal, and other secure payment methods."
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes 3-7 business days, depending on your location and shipping method."
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! You’ll receive a tracking link via email once your order is shipped."
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return items within 15 days of delivery. The product should be unused and in original packaging."
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our support team via email at support@baggify.com or call us at +91-1234567890."
    }
  ];

  return (
    <>
    <div className="FAQ-body">
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default FAQ;