import React from "react";

interface BlogPostPreviewProps {
  postContent: string;
  isGenerating: boolean;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ postContent, isGenerating }) => (
  <div style={{ 
    backgroundColor: '#fff', 
    border: '1px solid #e5e7eb', 
    borderRadius: '12px', 
    padding: '24px', 
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  }}>
    <h2 style={{ 
      color: '#374151', 
      marginTop: '0', 
      marginBottom: '20px',
      fontSize: '1.5em',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      📖 Generated Blog Post
      {isGenerating && (
        <div style={{
          width: '20px',
          height: '20px',
          border: '2px solid #f3f3f3',
          borderTop: '2px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
    </h2>
    <div style={{
      whiteSpace: 'pre-wrap',
      lineHeight: '1.6',
      color: '#374151',
      backgroundColor: '#f8fafc',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      fontSize: '1.05em'
    }}>
      {postContent || (isGenerating ? "Generating blog post..." : "No content generated yet.")}
    </div>
  </div>
);

export default BlogPostPreview;
