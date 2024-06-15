"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Contact = () => {
    const [formData, setFormData] = (0, react_1.useState)({ name: '', email: '', message: '' });
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };
    return (<div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required/>
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Contact Details</h2>
        <p>Email: contact@example.com</p>
        <p>Social Media Links...</p>
      </div>
    </div>);
};
exports.default = Contact;
