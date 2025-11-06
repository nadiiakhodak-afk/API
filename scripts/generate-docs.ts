import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '@/lib/openapi';
const GROUP_DISPLAY_NAMES: Record<string, string> = {
    accounts: 'Accounts',
    customers: 'Customers',
    transactions: 'Transactions',
};

const injectGroup = (content: string, group: string) => {
    const start = content.indexOf('---\n');
    const end = content.indexOf('\n---', start + 4);
    if (start !== 0 || end === -1) return content;

    const frontmatter = content.slice(start + 4, end);
    if (frontmatter.includes('\ngroup:') || frontmatter.trimStart().startsWith('group:')) {
        return content;
    }

    const insertionPoint = frontmatter.indexOf('full: true');
    if (insertionPoint === -1) return content;

    const before = frontmatter.slice(0, insertionPoint + 'full: true'.length);
    const after = frontmatter.slice(insertionPoint + 'full: true'.length);
    const updatedFrontmatter = `${before}\ngroup: ${group}${after}`;

    return `---\n${updatedFrontmatter}\n---${content.slice(end + 4)}`;
};

void generateFiles({
    input: openapi,
    output: './content/docs/OpenAPI',
    includeDescription: true,
    groupBy: 'tag',
    beforeWrite(files) {
        for (const file of files) {
            const [maybeTagFolder] = file.path.split('/');
            const displayName = GROUP_DISPLAY_NAMES[maybeTagFolder];
            if (!displayName) continue;
            file.content = injectGroup(file.content, displayName);
        }
    },
});
