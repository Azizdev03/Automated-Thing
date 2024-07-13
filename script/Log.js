module.exports = {
    async handleEvent(api, event) {
        if (event.logMessageData?.addedParticipants) {
            event.logMessageData.addedParticipants.forEach(async (participant) => {
                try {
                    const info = await api.getUserInfo(participant.userFbId);
                    const { name } = info[participant.userFbId];
 
                    if (participant.userFbId === api.getCurrentUserID()) {
                        // Get group info
                        const threadInfo = await api.getThreadInfo(event.threadID);
                        const groupName = threadInfo.threadName;
                        const memberCount = threadInfo.participantIDs.length;
 
                        // If the bot is added to the group
                        api.sendMessage(`𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗 𝗦𝗨𝗖𝗦𝗘𝗦𝗦\n[✦🆔] [${groupName}]\n━━━━━━━━━━━━━[${memberCount}]\nAziz`, event.threadID);
                    } else {
                        // If any other participant is added to the group
                        api.sendMessage(`Bonjour ${name} 🎉🌟, bienvenue dans notre groupe ! 🌟🎉

Nous sommes ravis de t'accueillir parmi nous avec grand enthousiasme et chaleur. 🤗🌺 Ici, c'est un véritable petit cocon de bonne humeur, de partage et d'amitié, où chacun trouve sa place et peut s'épanouir. 🌈💫

N'hésite pas à te joindre à nos discussions, à partager tes idées et à faire partie de notre belle communauté. 🤝💬 Ensemble, nous créerons des moments magiques et des souvenirs inoubliables. 🌟✨

Que cette nouvelle aventure parmi nous soit remplie de joie, de complicité et d'échanges enrichissants. 🌻🌈 Bienvenue à toi, cher membre, dans notre famille virtuelle. 🥳🤗`, event.threadID);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            });
        }
    }
};
