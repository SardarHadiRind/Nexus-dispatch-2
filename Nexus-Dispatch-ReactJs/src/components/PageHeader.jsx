export default function PageHeader({ bgClass, title, description }) {
  return (
    <section className={`page-header ${bgClass}`}>
      <div className="container fade-up">
        <h1 className="page-title">{title}</h1>
        <p className="page-desc">{description}</p>
      </div>
    </section>
  )
}
