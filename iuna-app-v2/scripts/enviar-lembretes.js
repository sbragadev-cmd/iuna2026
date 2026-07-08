const axios = require('axios');
const admin = require('firebase-admin');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
if (!process.env.FIREBASE_SERVICE_ACCOUNT) throw new Error('FIREBASE_SERVICE_ACCOUNT não configurado.');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), projectId: serviceAccount.project_id });
const db = getFirestore(admin.app(), 'default');
const CONFIG = { dataBase: '2026-07-07', semanaBase: 20 };
function agoraBrasil(){ return new Date(new Date().toLocaleString('en-US',{timeZone:'America/Sao_Paulo'})); }
function inicioDia(d){ const x=new Date(d); x.setHours(0,0,0,0); return x; }
function depoisAmanha(d){ const x=new Date(d); x.setDate(x.getDate()+2); x.setHours(0,0,0,0); return x; }
function gestacao(){ const hoje=inicioDia(agoraBrasil()); const base=new Date(`${CONFIG.dataBase}T12:00:00-03:00`); const diff=Math.floor((hoje-base)/86400000); const total=CONFIG.semanaBase*7+diff; return { semanas:Math.floor(total/7), dias:((total%7)+7)%7 }; }
async function eventos(){ const ini=inicioDia(agoraBrasil()), fim=depoisAmanha(agoraBrasil()); const snap=await db.collection('iuna_eventos').where('data','>=',Timestamp.fromDate(ini)).where('data','<',Timestamp.fromDate(fim)).get(); return snap.docs.map(d=>({id:d.id,...d.data()})); }
function fmt(d){ return d?.toDate ? d.toDate().toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo',dateStyle:'short',timeStyle:'short'}) : 'sem data'; }
async function whats(phone,key,msg){ if(!phone||!key) return; const url='https://api.callmebot.com/whatsapp.php'+`?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(msg)}&apikey=${encodeURIComponent(key)}`; const res=await axios.get(url); console.log(res.data); }
async function main(){ const g=gestacao(); const evs=await eventos(); let msg=`💜 Bom dia, Mamãe e Papai!\n\n👶 Hoje a Iúna está com ${g.semanas} semanas${g.dias?` e ${g.dias} dias`:''} de gestação.\n`; if(evs.length){ msg+='\n📅 Próximos lembretes:\n'; evs.forEach(e=>{msg+=`\n• ${e.tipo||'Evento'}: ${e.titulo||'Sem título'}\n  Data: ${fmt(e.data)}\n  Local: ${e.local||'não informado'}\n`;}); } else msg+='\nHoje não há consultas ou exames cadastrados para hoje ou amanhã.'; msg+='\n\nCom carinho,\nAssistente da Iúna 👶💜'; await whats(process.env.MAMAE_PHONE,process.env.MAMAE_CALLMEBOT_KEY,msg); await whats(process.env.PAPAI_PHONE,process.env.PAPAI_CALLMEBOT_KEY,msg); }
main().catch(e=>{console.error('Erro no Assistente da Iúna:',e);process.exit(1)});
