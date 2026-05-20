export function RankingList({ items }) {
  return (
    <ol className="ranking-list">
      {items.map((student, index) => (
        <li key={student.id}>
          <span className="rank-position">{index + 1}</span>
          <div>
            <strong>{student.name}</strong>
            <small>{student.certificates} certificados</small>
          </div>
          <b>{student.points} pts</b>
        </li>
      ))}
    </ol>
  );
}
