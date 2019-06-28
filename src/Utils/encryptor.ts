import * as md5 from 'md5'
export const KugouMid = () => md5(( 1 + Math.random() * 0x100000 | 0).toString(16).substring(1));