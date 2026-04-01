const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwutuubdteeKK4HFYquOw0SYyOGlH-KbVts59ES_bA5QY8elw7EkZwy1pFYMkEcwOc/exec';

export async function appendEmailToSheet(
  email: string,
  createdAt: string,
  primaryArchetype: string,
  secondaryArchetype: string | null
) {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, createdAt, primaryArchetype, secondaryArchetype }),
    });
  } catch (err) {
    console.error('Google Sheets append failed:', err);
  }
}

export async function bulkAppendEmails(
  rows: {
    email: string;
    createdAt: string;
    primaryArchetype: string;
    secondaryArchetype: string | null;
  }[]
) {
  for (const row of rows) {
    await appendEmailToSheet(
      row.email,
      row.createdAt,
      row.primaryArchetype,
      row.secondaryArchetype
    );
  }
}

// Dummy — not needed with Apps Script approach
export async function getExistingEmails(): Promise<Set<string>> {
  return new Set();
}
