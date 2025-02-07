from pymongo import AsyncMongoClient

class Database:
    def __init__(self, uri: str, database: str):
        self.client = AsyncMongoClient(uri)
        self.db = self.client.get_database(database)

    async def get_chat_history(self, chatId: str):
        # Get chat history from database
        try:
            messages = await self.db.get_collection('messages').find({'chatId': chatId})
            return messages
        except Exception as e:
            print(e)
            return None
    
    async def save_message(self, message: dict):
        # Save message to database
        try:
            message = await self.db.get_collection('messages').insert_one(message)
            return message
        except Exception as e:
            print(e)
            return None
    
    async def create_chat(self, chatId: str):
        # Create a new chat
        try:
            chat = await self.db.get_collection('chats').insert_one({})
            return chat
        except Exception as e:
            print(e)
            return None
    
    async def get_all_chats(self):
        # Get all chats
        try:
            chats = await self.db.get_collection('chats').find({})
            return chats
        except Exception as e:
            print(e)
            return None
