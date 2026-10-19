import {
  type Certificate,
  certificates,
  satr,
  tuwaiqProfile,
} from "@/data/certificates";

function Row({ c }: { c: Certificate }) {
  return (
    <li>
      <span className="perm dim">-r--r--r--</span>
      <span className="nlink dim">1</span>
      <span className="owner dim">omar</span>
      <span>{c.issuer}</span>
      <span className="date">{c.date}</span>
      <span className="name">
        {c.href ? <a href={c.href}>{c.name}</a> : c.name}
      </span>
    </li>
  );
}

// `ls -l ~/certs/*`: a block per folder, the issuer in the group column.
// Linked names have a public page to verify the certificate.
export default function Certificates() {
  return (
    <div className="ls-l">
      {certificates.map(({ dir, files }) => (
        <section key={dir} aria-label={dir} className="gap">
          <p>/root/certs/{dir}:</p>
          <p className="dim">total {files.length}</p>
          <ul>
            {files.map((c) => (
              <Row key={c.name} c={c} />
            ))}
          </ul>
        </section>
      ))}
      <section aria-label="tuwaiq-satr" className="gap">
        <p>/root/certs/tuwaiq-satr:</p>
        <details>
          <summary>
            <span className="perm dim">drwxr-xr-x</span>
            <span className="nlink dim">{satr.length}</span>
            <span className="owner dim">omar</span>
            <span>tuwaiq</span>
            <span className="date">{satr[0]?.date}</span>
            <span className="name">
              <span className="dir">satr/</span>{" "}
              <span className="btn when-closed">
                [open: {satr.length} courses]
              </span>
              <span className="btn when-open">[close]</span>
            </span>
          </summary>
          <ul>
            {satr.map((c) => (
              <Row key={c.name} c={c} />
            ))}
          </ul>
        </details>
        <p>
          <span className="dim"># all with badges:</span>{" "}
          <a href={tuwaiqProfile}>{tuwaiqProfile.replace("https://", "")}</a>
        </p>
      </section>
    </div>
  );
}
