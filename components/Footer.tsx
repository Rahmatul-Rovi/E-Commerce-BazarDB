const footerLinks = {
  Company: ["About Us", "Careers", "Blog"],
  Help: ["FAQ", "Delivery Info", "Returns", "Contact Us"],
  Legal: ["Terms of Service", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 pt-12 pb-6 px-4 md:px-8">
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-heading font-bold">
              B
            </div>
            <span className="font-heading font-bold text-xl text-white">
              Bazar<span className="text-primary">DB</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Online grocery and daily essentials delivered fast to your doorstep.
          </p>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="text-white font-semibold mb-3">{section}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 max-w-6xl mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BazarDB. All rights reserved.
      </div>
    </footer>
  );
}