export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-brand-950 text-brand-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold">JunkLife</h3>
          <p className="mt-3 text-sm text-brand-100">Sustainable scrap pickup for homes, apartments, and workplaces across India.</p>
        </div>
        <div>
          <h4 className="font-semibold">Service Promise</h4>
          <p className="mt-3 text-sm text-brand-100">Transparent pricing, punctual pickups, and safe recycling partnerships.</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-3 text-sm text-brand-100">support@junklife.in</p>
          <p className="text-sm text-brand-100">+91 98765 43210</p>
        </div>
      </div>
    </footer>
  );
}
