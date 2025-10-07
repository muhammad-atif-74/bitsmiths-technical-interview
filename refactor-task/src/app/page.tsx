import Table, { Issue } from "./components/table";
import issues from "./constants/issues.json";

export default function Home() {
  // Explicitly typecast to ensure TypeScript understands the JSON structure
  const typedIssues = issues as Issue[];
  return <Table issues={typedIssues} />;
}
