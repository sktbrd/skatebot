import React from "react";

interface GenerationProcessProps {
  totalCommits: number;
  repoCount: number;
  isLoading?: boolean;
  currentStep?: number;
  error?: string | null;
}

const GenerationProcess: React.FC<GenerationProcessProps> = ({ 
  totalCommits, 
  repoCount, 
  isLoading = false, 
  currentStep = 0,
  error = null 
}) => {
  const steps = [
    {
      id: 1,
      title: "Fetch Repository Commits",
      description: `Retrieved ${totalCommits} commits from ${repoCount} repositories since last check`,
      color: "#10b981",
      icon: "📡"
    },
    {
      id: 2,
      title: "Analyze Commit Data", 
      description: "Extracted author info, timestamps, and commit messages for context",
      color: "#3b82f6",
      icon: "🔍"
    },
    {
      id: 3,
      title: "AI Content Generation",
      description: "Used OpenAI GPT-4 to create engaging blog post with contributor recognition",
      color: "#8b5cf6",
      icon: "🤖"
    },
    {
      id: 4,
      title: "Review & Approval",
      description: "Ready for human review and approval before publishing to Hive",
      color: "#f59e0b",
      icon: "✅"
    }
  ];

  const getStepStatus = (stepId: number) => {
    if (error && stepId === currentStep) return 'error';
    if (isLoading && stepId === currentStep) return 'loading';
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      border: '1px solid #e5e7eb', 
      borderRadius: '12px', 
      padding: '24px', 
      marginBottom: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <h2 style={{ 
        color: '#374151', 
        marginTop: '0', 
        marginBottom: '20px', 
        fontSize: '1.5em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🔧 Text Generation Process
        {isLoading && (
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        )}
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const isActive = status === 'active' || status === 'loading';
          const isCompleted = status === 'completed';
          const isError = status === 'error';
          
          return (
            <div 
              key={step.id}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                opacity: status === 'pending' ? 0.6 : 1,
                transition: 'opacity 0.3s ease'
              }}
            >
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: isError ? '#dc2626' : isCompleted ? '#10b981' : step.color,
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold',
                fontSize: '14px',
                position: 'relative',
                boxShadow: isActive ? `0 0 0 4px ${step.color}20` : 'none',
                transition: 'all 0.3s ease'
              }}>
                {isError ? '❌' : isCompleted ? '✓' : status === 'loading' ? (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                ) : step.id}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '600', 
                  color: isError ? '#dc2626' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>{step.icon}</span>
                  {step.title}
                  {isActive && !isError && (
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#6366f1', 
                      fontWeight: 'normal' 
                    }}>
                      (in progress...)
                    </span>
                  )}
                </div>
                <div style={{ 
                  fontSize: '0.9em', 
                  color: isError ? '#dc2626' : '#6b7280',
                  marginTop: '4px'
                }}>
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div style={{
        marginTop: '20px',
        height: '4px',
        backgroundColor: '#e5e7eb',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: error ? '#dc2626' : '#6366f1',
          width: `${Math.max(0, Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100))}%`,
          transition: 'width 0.5s ease',
          borderRadius: '2px'
        }} />
      </div>
    </div>
  );
};

export default GenerationProcess;
