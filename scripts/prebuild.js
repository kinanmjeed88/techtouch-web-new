import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CWD = process.cwd();
const POSTS_DIR = path.join(CWD, 'content/posts');
const OUTPUT_PATH = path.join(CWD, 'public/posts.json');

function generatePosts() {
  // 1. Check if content/posts directory exists, create if not
  if (!fs.existsSync(POSTS_DIR)) {
    console.log("Creating 'content/posts' directory...");
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // 2. Read all .md files
  const fileNames = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

  if (fileNames.length === 0) {
    console.warn("No markdown files found in 'content/posts'. Generating an empty posts.json.");
    return [];
  }

  // 3. Parse each file and extract frontmatter + content
  const allPostsData = fileNames.map(fileName => {
    const filePath = path.join(POSTS_DIR, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Basic validation
    if (!data.timestamp || !data.title) {
        console.warn(`Skipping ${fileName}: missing 'timestamp' or 'title' in frontmatter.`);
        return null;
    }
    
    // Generate a unique ID from the timestamp for React keys
    const id = new Date(data.timestamp).getTime();

    return {
      id,
      ...data,
      content,
    };
  }).filter(Boolean); // Filter out nulls from skipped files

  // 4. Sort posts by timestamp (newest first)
  allPostsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return allPostsData;
}

try {
  const posts = generatePosts();
  const outputData = { posts };
  
  // 5. Write to public/posts.json
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(outputData, null, 2));
  console.log(`✅ Successfully generated ${posts.length} posts to ${OUTPUT_PATH}`);

} catch (error) {
  console.error('❌ Error generating posts.json:', error);
  // Create an empty file to prevent the site build from failing
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ posts: [] }, null, 2));
  process.exit(1); // Exit with error code
}
