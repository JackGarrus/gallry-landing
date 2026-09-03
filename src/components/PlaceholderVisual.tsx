type Props = {
  label: string;
};

export function PlaceholderVisual({ label }: Props) {
  return (
    <div className="placeholder-visual">
      <span>{label}</span>
    </div>
  );
}
