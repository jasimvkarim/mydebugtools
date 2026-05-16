# 🔴 URGENT FIX: redirect_uri_mismatch Error

## The Problem
Google OAuth is receiving: `https://www.debugtools.org/api/auth/callback/google`
But you only added: `https://debugtools.org/api/auth/callback/google`

## The Solution: Add BOTH URLs

### Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Scroll to "Authorized redirect URIs"
4. Add BOTH of these URIs:

```
http://localhost:3000/api/auth/callback/google
https://debugtools.org/api/auth/callback/google
https://www.debugtools.org/api/auth/callback/google
```

### Why Both?
- Users might visit `debugtools.org` OR `www.debugtools.org`
- Your hosting (Vercel/Netlify) might redirect between them
- Google OAuth requires EXACT match of the redirect URI

### After Adding
1. Click "Save" in Google Cloud Console
2. Wait 1-2 minutes for changes to propagate
3. Clear your browser cookies for debugtools.org
4. Try signing in again

---

## Alternative: Force Non-WWW Redirect

If you want users to ALWAYS use the non-www version, configure your hosting:

### Vercel
Add to `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.debugtools.org"
        }
      ],
      "destination": "https://debugtools.org/:path*",
      "permanent": true
    }
  ]
}
```

### After Setting Up Redirect
You can keep only the non-www redirect URI in Google Cloud Console.

---

## Quick Checklist

- [ ] Go to Google Cloud Console → Credentials
- [ ] Click your OAuth client
- [ ] Add `https://www.debugtools.org/api/auth/callback/google`
- [ ] Save changes
- [ ] Wait 1-2 minutes
- [ ] Clear browser cookies
- [ ] Test sign-in

**This should fix it immediately!** ✅
