const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const Service = require('./Service');
const service = new Service();
const BOT = require('./BotMessages')

bot.start((ctx) => ctx.reply(BOT.START_MESSAGE));
bot.help((ctx) => ctx.reply(BOT.HELP_MESSAGE));

bot.hears(/\+ (.+)/, (ctx) => {
    try {
        item = service.addItemToList(ctx.message.text);
        if (item.includes(',')) 
            ctx.reply(item + ' foram adicionados à lista');
        else 
            ctx.reply(item + ' foi adicionado à lista');
    } catch {
        ctx.reply("Erro ao adicionar à lista");
    }
})

bot.hears(/- (.+)/, (ctx) => {
   try {
       item = service.removeItemFromList(ctx.message.text);
       ctx.reply(item + ' foi removido da lista');
   } catch {
       ctx.reply("Item não encontrado");
   }
})

bot.hears(/mostrar lista/i, (ctx) => {
    try {
        list = service.getFormattedList();
        ctx.reply(list);
    } catch {
        ctx.reply("Erro ao exibir lista");
    }
})

bot.hears(/apagar lista/i, (ctx) => {
    try {
        service.deleteList();
        ctx.reply("A lista foi apagada com sucesso");
    } catch {
        ctx.reply("Erro ao apagar lista");
    }
})

bot.hears(/recuperar lista/i, (ctx) => {
    try {
        list = service.getBackupList();
        ctx.reply(list);
    } catch {
        ctx.reply("Erro ao recuperar lista");
    }
})

bot.launch();
