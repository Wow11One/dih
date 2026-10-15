// Boots Payload together with the server instead of on the first request:
// applies pending migrations (production), seeds an empty install and starts
// the job runner that executes scheduled publishing.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { getPayload } = await import('payload');
  const { default: config } = await import('@payload-config');
  try {
    await getPayload({ config });
  } catch (error) {
    console.error('Payload failed to initialize on startup', error);
  }
}
