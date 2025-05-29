import React, { useState } from "react";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import GenerationProcess from "./components/GenerationProcess";
import CommitDetails from "./components/CommitDetails";
import BlogPostPreview from "./components/BlogPostPreview";
import ActionButtons from "./components/ActionButtons";

interface CommitDetailsType {
  author: string;
  message: string;
  date: string;
}

interface PreviewProps {
  postContent: string;
  commits?: Record<string, CommitDetailsType[]>;
  isGenerating?: boolean;
}

const Preview: React.FunctionComponent<PreviewProps> = ({ postContent, commits: initialCommits, isGenerating = false }) => {
  const [showCommitDetails, setShowCommitDetails] = useState(true);
  const [showGenerationProcess, setShowGenerationProcess] = useState(false);
  // Fix: commits must be stateful for selection to work
  const [commits, setCommits] = useState<Record<string, CommitDetailsType[]>>(initialCommits || {});
  const [selectedCommits, setSelectedCommits] = useState<Record<string, boolean>>({});
  const [summary, setSummary] = useState<string>("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const handleSelectCommit = (repo: string, commitIndex: number, checked: boolean) => {
    const key = `${repo}__${commitIndex}`;
    setSelectedCommits(prev => {
      const updated = { ...prev, [key]: checked };
      console.log('[DEBUG] handleSelectCommit', { key, checked, updated });
      return updated;
    });
  };

  // Helper to get only selected commits in the same structure
  const getSelectedCommits = () => {
    if (!commits) return {};
    const filtered: Record<string, CommitDetailsType[]> = {};
    Object.entries(commits).forEach(([repo, commitList]) => {
      const selected = commitList.filter((_, idx) => selectedCommits[`${repo}__${idx}`]);
      if (selected.length > 0) filtered[repo] = selected;
    });
    console.log('[DEBUG] getSelectedCommits', filtered);
    return filtered;
  };

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    setSummary("");
    try {
      const selected = getSelectedCommits();
      console.log('[DEBUG] handleGenerateSummary selected', selected);
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commits: selected })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('[DEBUG] handleGenerateSummary response', data);
      if (data.success) {
        setSummary(data.summary);
      } else {
        setSummaryError(data.error || "Failed to generate summary");
      }
    } catch (err: any) {
      setSummaryError(err.message || "Failed to generate summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  // Fix: update selectedCommits when Select All/Deselect All is used
  const handleSelectAll = (checked: boolean) => {
    if (!commits) return;
    setSelectedCommits(prev => {
      const all: Record<string, boolean> = {};
      Object.entries(commits).forEach(([repo, commitList]) => {
        commitList.forEach((_, idx) => {
          all[`${repo}__${idx}`] = checked;
        });
      });
      console.log('[DEBUG] handleSelectAll', { checked, all });
      return all;
    });
  };

  React.useEffect(() => {
    console.log('[DEBUG] selectedCommits', selectedCommits);
  }, [selectedCommits]);

  const totalCommits = commits ? Object.values(commits).reduce((sum, commitList) => sum + commitList.length, 0) : 0;
  const repoCount = commits ? Object.keys(commits).length : 0;
  // Fix: enable button if at least one commit is selected (not just true/false)
  const anySelected = Object.values(selectedCommits).some(v => v);
  console.log('[DEBUG] anySelected', anySelected, selectedCommits);

  console.log('[DEBUG] CommitDetails props', { selectedCommits, commits });

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <Header />
      <StatsBar totalCommits={totalCommits} repoCount={repoCount} isGenerating={isGenerating} />
      <div style={{ marginBottom: '16px', color: '#6366f1', fontSize: '0.95em' }}>
        <b>Test in terminal:</b> <code>curl -s http://localhost:3000/api/commits | jq</code>
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        {/* Commits selection (left) */}
        <div style={{ flex: 2, minWidth: 0 }}>
          <div style={{ marginBottom: 12 }}>
            <button
              id="select-all-btn"
              onClick={() => handleSelectAll(true)}
              style={{
                backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', marginRight: 8
              }}
            >
              Select All
            </button>
            <button
              id="deselect-all-btn"
              onClick={() => handleSelectAll(false)}
              style={{
                backgroundColor: '#e5e7eb', color: '#374151', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
              }}
            >
              Deselect All
            </button>
          </div>
          <CommitDetails
            commits={commits || {}}
            showCommitDetails={showCommitDetails}
            totalCommits={totalCommits}
            onToggle={() => setShowCommitDetails(!showCommitDetails)}
            selectedCommits={selectedCommits}
            onSelectCommit={handleSelectCommit}
          />
        </div>
        {/* Generation (right) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ margin: '24px 0' }}>
            <button
              id="generate-summary-btn"
              onClick={handleGenerateSummary}
              disabled={summaryLoading || !anySelected}
              style={{
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: summaryLoading || !anySelected ? 'not-allowed' : 'pointer',
                opacity: summaryLoading || !anySelected ? 0.6 : 1,
                marginBottom: '12px',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)'
              }}
            >
              {summaryLoading ? 'Generating Summary...' : 'Generate AI Summary from Selected Commits'}
            </button>
            <div id="summary-error" style={{ color: 'red', marginTop: 8, display: summaryError ? 'block' : 'none' }}>{summaryError}</div>
            <div id="summary-display" style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              whiteSpace: 'pre-line',
              fontSize: '1.1em',
              color: '#374151',
              display: summary ? 'block' : 'none'
            }}>
              <b>AI Summary:</b>
              <div style={{ marginTop: 12 }}>{summary}</div>
            </div>
          </div>
        </div>
      </div>
      <BlogPostPreview postContent={postContent} isGenerating={isGenerating} />
      <ActionButtons isGenerating={isGenerating} postContent={postContent} />
      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
        }
        button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Preview;
