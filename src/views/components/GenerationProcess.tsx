import React from "react";

interface GenerationProcessProps {
  totalCommits: number;
  repoCount: number;
}

const GenerationProcess: React.FC<GenerationProcessProps> = ({ totalCommits, repoCount }) => (
  <div style={{ 
    backgroundColor: '#fff', 
    border: '1px solid #e5e7eb', 
    borderRadius: '12px', 
    padding: '24px', 
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  }}>
    <h2 style={{ color: '#374151', marginTop: '0', marginBottom: '20px', fontSize: '1.5em' }}>
      🔧 Text Generation Process
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
        <div>
          <div style={{ fontWeight: '600', color: '#374151' }}>Fetch Repository Commits</div>
          <div style={{ fontSize: '0.9em', color: '#6b7280' }}>
            Retrieved {totalCommits} commits from {repoCount} repositories since last check
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
        <div>
          <div style={{ fontWeight: '600', color: '#374151' }}>Analyze Commit Data</div>
          <div style={{ fontSize: '0.9em', color: '#6b7280' }}>
            Extracted author info, timestamps, and commit messages for context
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
        <div>
          <div style={{ fontWeight: '600', color: '#374151' }}>AI Content Generation</div>
          <div style={{ fontSize: '0.9em', color: '#6b7280' }}>
            Used OpenAI GPT-4 to create engaging blog post with contributor recognition
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>4</div>
        <div>
          <div style={{ fontWeight: '600', color: '#374151' }}>Review & Approval</div>
          <div style={{ fontSize: '0.9em', color: '#6b7280' }}>
            Ready for human review and approval before publishing to Hive
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GenerationProcess;
