# SkateHive DevBot Rules & Guidelines 📋

This document outlines the rules, guidelines, and best practices for using the SkateHive DevBot responsibly and effectively.

## 🎯 Purpose & Scope

The SkateHive DevBot is designed to:
- **Automate development progress reporting** for the SkateHive ecosystem
- **Highlight contributor achievements** and technical milestones
- **Maintain transparency** in the development process
- **Engage the community** with regular updates

## ⚖️ Content Guidelines

### ✅ DO Include

- **Technical achievements**: Bug fixes, new features, improvements
- **Contributor recognition**: Acknowledge all developers and their work
- **Progress milestones**: Significant updates, releases, or breakthroughs
- **Community impact**: How changes benefit users and the ecosystem
- **Clear explanations**: Make technical content accessible to the community

### ❌ DON'T Include

- **Personal information**: Private details about contributors
- **Sensitive data**: API keys, passwords, or confidential information
- **Controversial content**: Avoid political or divisive topics
- **Incomplete work**: Don't highlight broken or unfinished features
- **Spam content**: Avoid repetitive or low-value posts

## 🔒 Security Rules

### Environment Variables
- **Never commit** `.env` files to version control
- **Rotate keys regularly**: Update API keys and credentials periodically
- **Use minimal permissions**: Grant only necessary access rights
- **Secure storage**: Store credentials using secure methods

### API Usage
- **Respect rate limits**: Follow GitHub and OpenAI API guidelines
- **Monitor usage**: Track API calls to avoid unexpected charges
- **Error handling**: Implement robust error handling for API failures
- **Timeout handling**: Set appropriate timeouts for external requests

## 📊 Posting Standards

### Quality Requirements
- **Minimum commit threshold**: Only post when there are meaningful updates
- **Content review**: Always preview and approve posts before publishing
- **Accuracy verification**: Ensure all information is correct and up-to-date
- **Professional tone**: Maintain a constructive and positive voice

### Frequency Guidelines
- **Daily maximum**: No more than one development update per day
- **Weekly minimum**: Aim for at least one update per week if there's activity
- **Break periods**: Take breaks during low-activity periods
- **Special events**: Allow extra posts for major releases or milestones

## 🏷️ Tagging Protocol

### Required Tags
- `#skatehive`: Primary community tag
- `#devlog`: Development log identifier
- Relevant project tags (e.g., `#gnars`, `#terminal`, `#api`)

### Tag Limits
- **Maximum 10 tags** per post (Hive blockchain limit)
- **Relevant tags only**: Don't use unrelated tags for visibility
- **Consistent naming**: Use established tag conventions
- **Community tags**: Include tags that help community discovery

## 🤖 Bot Behavior Rules

### Automated Actions
- **Human approval required**: Never auto-post without review
- **Error reporting**: Log and report all errors appropriately
- **Graceful failures**: Handle errors without crashing or data loss
- **Resource management**: Clean up temporary files and connections

### Manual Overrides
- **Admin controls**: Maintain ability to manually stop or modify posts
- **Emergency procedures**: Have protocols for urgent situations
- **Configuration changes**: Allow runtime configuration updates
- **Maintenance mode**: Support disabling the bot when needed

## 👥 Community Standards

### Contributor Recognition
- **Fair attribution**: Credit all contributors accurately
- **Consistent formatting**: Use standard formats for author recognition
- **Inclusive language**: Use respectful and inclusive terminology
- **Community values**: Align content with SkateHive community values

### Communication Guidelines
- **Transparency**: Be open about bot operations and limitations
- **Responsiveness**: Address community feedback promptly
- **Improvement**: Continuously improve based on user suggestions
- **Documentation**: Keep documentation current and helpful

## 🔧 Technical Requirements

### Code Quality
- **Type safety**: Use TypeScript for type checking
- **Error handling**: Implement comprehensive error handling
- **Testing**: Test all functionality before deployment
- **Documentation**: Comment code and maintain technical docs

### Performance Standards
- **Response time**: Keep web interface responsive (< 3 seconds)
- **Resource usage**: Monitor memory and CPU usage
- **Scalability**: Design for handling increased repository count
- **Reliability**: Maintain high uptime and error recovery

## 📈 Monitoring & Compliance

### Required Monitoring
- **API usage tracking**: Monitor GitHub and OpenAI API consumption
- **Error rate monitoring**: Track and address error patterns
- **Performance metrics**: Monitor response times and resource usage
- **Content quality**: Review generated content for accuracy

### Compliance Checks
- **Regular audits**: Review bot behavior and output quality
- **Security reviews**: Regularly check for security vulnerabilities
- **Dependency updates**: Keep dependencies current and secure
- **Backup procedures**: Maintain reliable backup and recovery

## ⚠️ Violation Consequences

### Minor Violations
- **Warning**: First offense receives a warning
- **Temporary disable**: Repeated minor violations may result in temporary suspension
- **Manual review**: Require manual approval for future posts

### Major Violations
- **Immediate suspension**: Stop bot operations immediately
- **Investigation**: Conduct thorough investigation of the issue
- **Corrective action**: Implement fixes before resuming operations
- **Community notification**: Inform community of any issues if appropriate

## 🔄 Updates & Changes

### Rule Modifications
- **Community input**: Involve community in rule changes
- **Documentation updates**: Keep this document current
- **Version control**: Track changes to rules and guidelines
- **Implementation timeline**: Allow time for adaptation to new rules

### Feedback Mechanism
- **Open issues**: Use GitHub issues for rule discussions
- **Community forums**: Discuss in SkateHive community channels
- **Regular reviews**: Periodic review of rules effectiveness
- **Continuous improvement**: Adapt rules based on experience

## 📞 Contact & Support

### For Rule Clarifications
- **GitHub Issues**: Open an issue for rule questions
- **Community Channels**: Ask in SkateHive community forums
- **Direct Contact**: Reach out to maintainers for urgent matters

### For Violations or Concerns
- **Immediate reporting**: Report urgent issues immediately
- **Evidence documentation**: Provide clear documentation of issues
- **Collaborative resolution**: Work together to resolve problems
- **Learning opportunities**: Use issues as learning experiences

---

**Remember**: These rules exist to ensure the DevBot serves the SkateHive community effectively while maintaining quality, security, and community standards. When in doubt, prioritize community benefit and transparency.

*Last updated: May 28, 2025*
