export default function CV() {
  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Curriculum Vitae
            </span>

            <h1 className="text-4xl font-bold mt-2">
              HUYNH THANH TRA
            </h1>
          </div>

          <a
            href="/HUYNH_THANH_TRA_CV.pdf"
            download
            className="px-5 py-3 rounded-xl bg-white text-black text-sm font-medium hover:scale-105 transition"
          >
            Download PDF
          </a>
        </div>

        <div className="w-full h-[85vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          <img
            src="cv.png"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}