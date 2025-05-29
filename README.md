# SkateHive DevBot 🛹🤖

An automated development progress tracker and blog post generator for the SkateHive ecosystem. This bot monitors GitHub repositories, analyzes commit activity, and generates detailed blog posts about development progress for the SkateHive community on the Hive blockchain.

## 🌟 Features

- **Automated Commit Tracking**: Monitors multiple GitHub repositories for new commits since the last check
- **AI-Powered Summarization**: Uses OpenAI GPT-4 to generate engaging blog posts from commit data
- **Detailed Commit Display**: Shows who contributed, what was done, and when it happened
- **Web Preview Interface**: Beautiful web UI to preview and approve blog posts before publishing
- **Hive Blockchain Integration**: Automatically posts approved content to the Hive blockchain
- **Configurable Repository List**: Easy management of tracked repositories
- **Progress Persistence**: Remembers the last check time to avoid duplicate reporting

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- OpenAI API key
- Hive blockchain account credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skatehive-devbot
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   HIVE_POSTING_KEY=your_hive_posting_key_here
   ```

4. **Configure the application**
   - Edit `config.json` to set your Hive username and preferences
   - Edit `repos.json` to specify which GitHub repositories to monitor

### Configuration Files

#### `config.json`
```json
{
  "hive_user": "your_hive_username",
  "tags": ["skatehive", "gnars", "devlog"],
  "last_checked": "2025-05-27T00:00:00Z"
}
```

#### `repos.json`
```json
[
  "sktbrd/gnars-terminal",
  "gnars-dao/gnars-docs",
  "sktbrd/skatehive",
  "sktbrd/skatehive-docs",
  "sktbrd/leaderboard-api",
  "SkateHive/skatehive3.0"
]
```

## 🎮 Usage

### Running the DevBot

1. **Start the application**
   ```bash
   pnpm start
   ```

2. **Preview and approve**
   - The bot will fetch new commits from tracked repositories
   - A web interface will open at `http://localhost:3000/preview`
   - Review the generated blog post and commit details
   - Choose to approve, edit, or cancel the post

3. **Automatic posting**
   - If approved, the post will be published to the Hive blockchain
   - The `last_checked` timestamp will be updated
   - A detailed blog summary will be saved to `./output/blog.md`

### Web Interface Features

The preview interface shows:
- **📝 Commits Being Summarized**: Detailed view of all commits with author, date, and message
- **📖 Generated Blog Post**: AI-generated summary ready for publishing
- **Action Buttons**: Approve, Edit, or Cancel options

## 🛠️ Development

### Project Structure

```
skatehive-devbot/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── fetchCommits.ts       # GitHub API integration
│   ├── summarize.ts          # OpenAI integration and blog generation
│   ├── server.ts             # Web preview server
│   ├── postToHive.ts         # Hive blockchain posting
│   ├── preview.ts            # CLI preview functionality
│   ├── config.ts             # Configuration management
│   ├── utils.ts              # Utility functions
│   └── views/
│       └── preview.tsx       # React preview component
├── config.json              # Application configuration
├── repos.json               # Repository list
├── .env                     # Environment variables
└── output/                  # Generated blog files
```

### Key Technologies

- **TypeScript**: Type-safe development
- **React**: Web UI components
- **Express**: Web server for preview interface
- **OpenAI API**: AI-powered content generation
- **GitHub API**: Repository monitoring via @octokit/rest
- **Hive blockchain**: Content publishing via @hiveio/dhive
- **Day.js**: Date manipulation
- **fs-extra**: Enhanced file system operations

## 📊 Output Format

The bot generates:

1. **Detailed Blog Post**: AI-generated summary highlighting:
   - Development progress across repositories
   - Contributor achievements
   - Technical improvements and features
   - Community impact and milestones

2. **Commit Summary File**: Saved to `./output/blog.md` containing:
   - Repository-organized commit lists
   - Author attribution
   - Timestamps and commit messages
   - Formatted for easy reading

## 🔧 Customization

### Adding New Repositories

1. Edit `repos.json` to include new repository paths:
   ```json
   [
     "owner/repo-name",
     "another-owner/another-repo"
   ]
   ```

### Modifying Blog Generation

The AI prompt can be customized in `src/summarize.ts`:
- Adjust the system message for different writing styles
- Modify the prompt template for specific focus areas
- Change the max_tokens limit for longer/shorter posts

### Changing Tags and Settings

Update `config.json`:
- `tags`: Array of Hive tags for categorization
- `hive_user`: Your Hive blockchain username
- `last_checked`: Automatically managed timestamp

## 🚨 Error Handling

The application includes robust error handling for:
- Missing environment variables
- GitHub API rate limits
- OpenAI API failures
- Hive blockchain connection issues
- Invalid repository configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

Please ensure your contributions follow the existing code style and include appropriate documentation.

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Join the SkateHive community discussions
- Contact the development team

---

**Built with ❤️ for the SkateHive community**
