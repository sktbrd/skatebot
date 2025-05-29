import React, { useState } from "react";

interface CommitDetailsProps {
  commits: Record<string, { author: string; message: string; date: string }[]>;
  showCommitDetails: boolean;
  totalCommits: number;
  onToggle: () => void;
  selectedCommits?: Record<string, boolean>;
  onSelectCommit?: (repo: string, commitIndex: number, checked: boolean) => void;
}

const CommitDetails: React.FC<CommitDetailsProps> = ({ commits, showCommitDetails, totalCommits, onToggle, selectedCommits = {}, onSelectCommit }) => (
  <>
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={onToggle}
        style={{
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
          transition: 'background 0.2s',
          marginBottom: '8px',
        }}
        aria-expanded={showCommitDetails}
        aria-controls="commit-details-box"
      >
        {showCommitDetails ? '🔽 Hide' : '▶️ Show'} Commit Details ({totalCommits} commits)
      </button>
    </div>
    {showCommitDetails && commits && Object.keys(commits).length > 0 && (
      <div id="commit-details-box" style={{ marginBottom: '30px', transition: 'max-height 0.3s', overflow: 'hidden' }}>
        <h2 style={{ color: '#374151', marginBottom: '20px', fontSize: '1.5em' }}>
          📝 Commits Being Summarized
        </h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {Object.entries(commits).map(([repo, commitList]) => (
            <div key={repo} style={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '16px 24px', 
                borderBottom: '1px solid #e5e7eb' 
              }}>
                <h3 style={{ 
                  color: '#1f2937', 
                  margin: '0', 
                  fontSize: '1.2em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🔗 {repo}
                  <span style={{ 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.7em',
                    fontWeight: 'normal'
                  }}>
                    {commitList.length} commits
                  </span>
                </h3>
              </div>
              <div style={{ padding: '20px 24px' }}>
                {commitList.map((commit, index) => {
                  const commitKey = `${repo}__${index}`;
                  return (
                    <div key={index} style={{ 
                      borderLeft: '4px solid #3b82f6', 
                      paddingLeft: '16px', 
                      marginBottom: index < commitList.length - 1 ? '20px' : '0',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      {onSelectCommit && (
                        <input
                          type="checkbox"
                          id={`commit-checkbox-${repo.replace(/[^a-zA-Z0-9]/g, '_')}-${index}`}
                          name={`commit-checkbox-${repo.replace(/[^a-zA-Z0-9]/g, '_')}-${index}`}
                          data-commit-key={commitKey}
                          checked={!!selectedCommits[commitKey]}
                          onChange={e => {
                            e.stopPropagation();
                            onSelectCommit(repo, index, e.target.checked);
                          }}
                          style={{ marginTop: 6 }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px', 
                          marginBottom: '8px' 
                        }}>
                          <div style={{ 
                            backgroundColor: '#10b981',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8em',
                            fontWeight: '600'
                          }}>
                            👤 {commit.author}
                          </div>
                          <div style={{ 
                            color: '#6b7280', 
                            fontSize: '0.85em',
                            backgroundColor: '#f3f4f6',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}>
                            📅 {new Date(commit.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <div style={{ 
                          color: '#374151', 
                          lineHeight: '1.5',
                          backgroundColor: '#f8fafc',
                          padding: '12px',
                          borderRadius: '8px',
                          marginTop: '8px'
                        }}>
                          💬 {commit.message}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

export default CommitDetails;
