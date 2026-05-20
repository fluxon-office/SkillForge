export function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className="course-card-header">
        <span>{course.level}</span>
        <small>{course.duration}</small>
      </div>
      <h2>{course.title}</h2>
      <p>{course.teacher}</p>
      <div className="progress-track" aria-label={`Progresso ${course.progress}%`}>
        <span style={{ width: `${course.progress}%` }} />
      </div>
      <footer>
        <strong>{course.progress}%</strong>
        <span>{course.status}</span>
      </footer>
    </article>
  );
}
