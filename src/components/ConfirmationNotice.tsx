type ConfirmationNoticeProps = {
  confirmation: "expired" | "invalid";
};

export default function ConfirmationNotice({
  confirmation,
}: ConfirmationNoticeProps) {
  const message =
    confirmation === "expired"
      ? "Confirmation link expired"
      : "Confirmation link invalid or expired";

  return (
    <div className="confirmation-notice">
      <div className="confirmation-notice-inner">
        <strong>{message}</strong>

        <span>Submit your email again to receive a new confirmation link</span>

        <a href="#join">[ TRY AGAIN ]</a>
      </div>
    </div>
  );
}
