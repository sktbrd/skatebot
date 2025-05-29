import React from "react";

interface StatsBarProps {
  totalCommits: number;
  repoCount: number;
  isGenerating: boolean;
}

const StatsBar: React.FC<StatsBarProps> = ({ totalCommits, repoCount, isGenerating }) => (
  <div style={{ 
    display: 'flex', 
    gap: '20px', 
    marginBottom: '30px',
    flexWrap: 'wrap'
  }}>
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      flex: '1',
      minWidth: '200px'
    }}>
      <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#3b82f6' }}>{totalCommits}</div>
      <div style={{ color: '#6b7280', fontSize: '0.9em' }}>Total Commits</div>
    </div>
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      flex: '1',
      minWidth: '200px'
    }}>
      <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#10b981' }}>{repoCount}</div>
      <div style={{ color: '#6b7280', fontSize: '0.9em' }}>Repositories</div>
    </div>
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      flex: '1',
      minWidth: '200px'
    }}>
      <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#f59e0b' }}>
        {isGenerating ? '⏳' : '✅'}
      </div>
      <div style={{ color: '#6b7280', fontSize: '0.9em' }}>
        {isGenerating ? 'Generating...' : 'Ready'}
      </div>
    </div>
  </div>
);

export default StatsBar;
