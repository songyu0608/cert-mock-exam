import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 문항 본문·해설은 마크다운. HTML 태그는 그대로 글자로 보인다(react-markdown 기본 동작).
const plugins = [[remarkGfm, { singleTilde: false }]] as const;

export function Markdown({ children, inline }: { children: string; inline?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={plugins as never}
      components={{
        a: ({ node: _node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
        ...(inline ? { p: ({ children: c }) => <>{c}</> } : {}),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
