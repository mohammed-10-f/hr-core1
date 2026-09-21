const enc=new TextEncoder();
function b64u(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');}
function fromB64(s){let t=s.replaceAll('-','+').replaceAll('_','/'); while(t.length%4)t+='='; return Uint8Array.from(atob(t),c=>c.charCodeAt(0));}
export async function pbkdf2(password,salt,iters=100000){
  const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:enc.encode(salt),iterations:iters,hash:'SHA-256'},key,256);
  return b64u(bits);
}
export async function verifyPassword(password,stored){
  if(!stored) return false;
  const parts=stored.split('$');
  if(parts[0]==='pbkdf2' && parts.length===4){
    const got=await pbkdf2(password,parts[2],Number(parts[1]));
    return got===parts[3] || got.replaceAll('-','+').replaceAll('_','/')===parts[3].replaceAll('-','+').replaceAll('_','/');
  }
  const data=await crypto.subtle.digest('SHA-256',enc.encode(password));
  return b64u(data)===stored;
}
export function randomToken(){const b=new Uint8Array(32);crypto.getRandomValues(b);return b64u(b);}
export async function currentUser(db,request){
  const h=request.headers.get('Authorization')||''; if(!h.startsWith('Bearer ')) return null;
  const token=h.slice(7);
  return await db.prepare(`SELECT u.id,u.username,u.display_name,u.email,u.employee_id,u.company_id,u.role_id,u.must_change_password,r.code role_code,r.name_ar role_name FROM sessions s JOIN users u ON u.id=s.user_id JOIN roles r ON r.id=u.role_id WHERE s.session_token=? AND s.revoked_at IS NULL AND s.expires_at>datetime('now') AND u.active=1`).bind(token).first();
}
export async function permissions(db,userId){const r=await db.prepare(`SELECT p.code FROM role_permissions rp JOIN permissions p ON p.id=rp.permission_id JOIN users u ON u.role_id=rp.role_id WHERE u.id=? AND p.active=1`).bind(userId).all();return (r.results||[]).map(x=>x.code);}
export function requirePermission(user,permSet,permission){return user && (user.role_code==='super_admin'||permSet.has(permission));}
