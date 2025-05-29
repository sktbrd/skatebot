import React from "react";

interface ActionButtonsProps {
  isGenerating: boolean;
  postContent: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isGenerating, postContent }) => (
  <div style={{ 
    textAlign: 'center', 
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  }}>
    <h3 style={{ 
      color: '#374151', 
      marginBottom: '24px',
      fontSize: '1.3em'
    }}>
      What would you like to do?
    </h3>
    <form action="/action" method="POST" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <button 
        name="action" 
        value="regenerate"
        disabled={isGenerating}
        style={{
          backgroundColor: '#8b5cf6',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          opacity: isGenerating ? 0.6 : 1,
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        🔄 Regenerate Post
      </button>
      <button 
        name="action" 
        value="approve"
        disabled={isGenerating || !postContent}
        style={{
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: (isGenerating || !postContent) ? 'not-allowed' : 'pointer',
          opacity: (isGenerating || !postContent) ? 0.6 : 1,
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        ✅ Approve & Post to Hive
      </button>
      <button 
        name="action" 
        value="edit"
        disabled={isGenerating}
        style={{
          backgroundColor: '#f59e0b',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          opacity: isGenerating ? 0.6 : 1,
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        ✏️ Edit Post
      </button>
      <button 
        name="action" 
        value="cancel"
        disabled={isGenerating}
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          opacity: isGenerating ? 0.6 : 1,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        ❌ Cancel
      </button>
    </form>
    <div style={{ 
      marginTop: '20px', 
      fontSize: '0.9em', 
      color: '#6b7280',
      lineHeight: '1.5'
    }}>
      <strong>💡 Pro Tips:</strong><br />
      • Use "Regenerate" to create a new version with different AI interpretation<br />
      • "Edit" allows manual modifications before posting<br />
      • All approved posts are automatically saved to <code>./output/blog.md</code>
    </div>
  </div>
);

export default ActionButtons;
