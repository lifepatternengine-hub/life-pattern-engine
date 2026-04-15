const DEEP_REPORTS_DB = 'b1c07f3f6afa426e870d1641ad44b458';

export async function logDeepReportToNotion(
  responseId: string,
  primaryCode: string,
  secondaryCode: string | null,
  combinationAnalysis: string
): Promise<void> {
  const token = process.env.NOTION_API_KEY;
  if (!token) return;

  const reportUrl = `https://life-pattern-engine.xyz/deep-report/${responseId}`;

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: DEEP_REPORTS_DB },
      properties: {
        'Response ID': { title: [{ text: { content: responseId } }] },
        'Primary': { select: { name: primaryCode } },
        ...(secondaryCode ? { 'Secondary': { select: { name: secondaryCode } } } : {}),
        'Combination': { rich_text: [{ text: { content: combinationAnalysis.slice(0, 2000) } }] },
        'Report URL': { url: reportUrl },
      },
    }),
  });
}
