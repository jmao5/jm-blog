'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const extractTextContent = useCallback((node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractTextContent).join('');
    if (React.isValidElement(node)) return extractTextContent(node.props.children);
    return '';
  }, []);

  const codeText = extractTextContent(children);

  const handleCopy = useCallback(() => {
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
  }, [toast]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isMounted) return null;

  return (
    <div className='relative'>
      <CopyToClipboard text={codeText} onCopy={handleCopy}>
        <button className='absolute right-2 top-2 z-10'>
          {copied ? <ClipboardCheck className='h-5 w-5' /> : <Clipboard className='h-5 w-5' />}
        </button>
      </CopyToClipboard>
      <pre
        tabIndex={0}
        data-language='mdx'
        style={
          {
            '--shiki-dark': '#adbac7',
            '--shiki-light': '#24292e',
            '--shiki-dark-bg': '#22272e',
            '--shiki-light-bg': '#fff',
          } as React.CSSProperties
        }
      >
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;
