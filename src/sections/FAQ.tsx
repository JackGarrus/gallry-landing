const questions = [
  {
    question: "Who can join Gallry?",
    answer:
      "Gallry starts with musicians, producers, DJs, photographers, designers, illustrators, VJs and video artists. Anyone can join to discover their work.",
  },
  {
    question: "Can I upload video?",
    answer:
      "Yes. During beta, portfolios can contain up to 4 video clips and 1 minute of video in total.",
  },
  {
    question: "Is Gallry only local?",
    answer:
      "No. Location is optional. Discover artists nearby when it matters, or worldwide.",
  },
  {
    question: "How much does beta cost?",
    answer: "Nothing. Gallry is free during beta.",
  },
];

export default function FAQ() {
  return (
    <section className="page-section">
      <p className="section-label">FAQ</p>

      <div className="faq-list">
        {questions.map(({ question, answer }) => (
          <div className="faq-item" key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
