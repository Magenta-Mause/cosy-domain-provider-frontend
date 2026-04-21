interface MailboxProps {
  size?: number;
  flag?: string;
  body?: string;
}

export function Mailbox({ size = 48, flag, body }: MailboxProps) {
  const scale = size / 48;
  return (
    <span
      className="mailbox"
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom left" }}
      aria-hidden
    >
      <span className="post" />
      <span className="body" style={body ? { background: body } : undefined} />
      <span className="flag" style={flag ? { background: flag } : undefined} />
    </span>
  );
}
