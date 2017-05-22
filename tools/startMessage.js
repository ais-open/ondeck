import chalk from 'chalk';
import {chalkSuccess} from './chalkConfig';

/* eslint-disable no-console */

// Generated with http://www.text-image.com/convert/ascii.html

const AIS = `
MMMMMMMMMMMMMMMMMMMMMMMd:.-+NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMN+/+NM+    dMo.../mMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMM    hMNs+ohMs     +MMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMdhNNdNMMMMMMMMN/   -dMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMM  sMMMMMMMMMMMMMMmds++smMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM+      +MMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM        NMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs     'oMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNhsshNMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMNho+:::/oyNMMNssssshMMMMMMssssssMMMMMMMMNho+:::/oymMMM
MMMMy:           /my     hMMMMMm     /MMMMMMm:           .sM
MMm-       .:-'   '.    .MMMMMMo     hMMMMMN.    .+o+:   -sM
Mm'     :hMMMMMm+       oMMMMMM.    'MMMMMMh     mMMMMNsdMMM
M:     sMMMMMMMMMs      dMMMMMm     +MMMMMMm'    ':sdMMMMMMM
m     -MMMMMMMMMMN     -MMMMMMo     mMMMMMMMd-       ':sNMMM
d     +MMMMMMMMMMm     oMMMMMM.    -MMMMMMMMMMd+.        /NM
m     'MMMMMMMMMM:     mMMMMMd     sMMMMMMMMMMMMMNh+-     /M
M/     -dMMMMMMh-     -MMMMMM/     mMMMMMNy:.sMMMMMMM/    .M
MN-      ./+/:'       '++dMMM.     ++sMMh'    '/osso/     +M
MMMo'          -h.       dMMM/       oMMMd/             'oMM
MMMMMho/----/odMMNyo++//oMMMMMds++///mMMMMMNho/:-----/ohNMMM`;

console.log(chalk.yellow(AIS));
console.log(chalkSuccess('Starting app in dev mode...'));
