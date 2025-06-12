'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';

type MarkdownContentProps = {
  content: string;
  activeSection: string;
};

// Define types for markdown component props
type MarkdownComponentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

// Define type for code component props
type CodeProps = MarkdownComponentProps & {
  inline?: boolean;
};

export default function MarkdownContent({ content, activeSection }: MarkdownContentProps) {
  const [visibleContent, setVisibleContent] = useState('');

  useEffect(() => {
    // Extract the section content based on the activeSection
    const extractSection = () => {
      const sections: Record<string, string> = {};
      
      // Split the content by headings
      const lines = content.split('\n');
      let currentSection = '';
      let currentContent: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if this is a heading
        if (line.startsWith('## ')) {
          // Save the previous section if it exists
          if (currentSection) {
            sections[currentSection] = currentContent.join('\n');
          }
          
          // Start a new section
          currentSection = line.replace('## ', '').toLowerCase().replace(/[^\w]+/g, '-');
          currentContent = [line];
        } 
        // Check if this is a subheading
        else if (line.startsWith('### ')) {
          // If we're already in a section, check if this is the subsection we want
          const subsectionId = line.replace('### ', '').toLowerCase().replace(/[^\w]+/g, '-');
          
          if (activeSection === subsectionId) {
            // We found our subsection, save just this part
            const subsectionContent = [line];
            let j = i + 1;
            
            // Collect content until the next heading
            while (j < lines.length && !lines[j].startsWith('### ') && !lines[j].startsWith('## ')) {
              subsectionContent.push(lines[j]);
              j++;
            }
            
            sections[subsectionId] = subsectionContent.join('\n');
            break;
          }
          
          currentContent.push(line);
        } 
        else {
          currentContent.push(line);
        }
      }
      
      // Save the last section
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n');
      }
      
      return sections[activeSection] || content;
    };
    
    setVisibleContent(extractSection());
  }, [content, activeSection]);

  return (
    <motion.div 
      key={activeSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20"
    >
      {/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ node, ...props }: any) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} className="text-2xl font-bold mt-8 mb-4" />,
          h3: ({ node, ...props }: any) => <h3 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} className="text-xl font-semibold mt-6 mb-3" />,
          ul: ({ node, ...props }: any) => <ul {...props} className="list-disc pl-6 my-4" />,
          ol: ({ node, ...props }: any) => <ol {...props} className="list-decimal pl-6 my-4" />,
          li: ({ node, ...props }: any) => <li {...props} className="mb-1" />,
          p: ({ node, ...props }: any) => <p {...props} className="my-3" />,
          a: ({ node, ...props }: any) => <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />,
          code: ({ node, inline, ...props }: any) => 
            inline ? 
              <code {...props} className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" /> : 
              <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto">
                <code {...props} />
              </pre>
        }}
      >
        {visibleContent}
      </ReactMarkdown>
      {/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */}
    </motion.div>
  );
} 