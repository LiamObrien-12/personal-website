export default function Favicon() {
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href={`data:image/svg+xml,
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="20" fill="black"/>
            <text x="50" y="65" font-family="Arial" font-size="50" fill="white" text-anchor="middle">
              LO
            </text>
          </svg>
        `}
      />
    </>
  );
} 