import os

# Generate a 32-byte (64 hex characters) string for NEXTAUTH_SECRET
nextauth_secret = os.urandom(32).hex()
print(f"NEXTAUTH_SECRET={nextauth_secret}")

# Generate a 16-byte (32 hex characters) string for VERCEL
vercel = os.urandom(16).hex()
print(f"VERCEL={vercel}")
