from http import client
import discord
from discord.ext import commands

bot = commands.Bot('/')

@bot.event
async def on_ready():
    print(">> Bot_Test is on line <<")
    
@bot.event
async def on_member_join(member):
    channel = bot.get_all_channel(991020606587822181)
    await channel.send(f"{member} join!")
    
@bot.event
async def on_member_remove(member):
    print(f"{member} leave")

bot.run("OTkxMDQzMjY2Mjk0MjA2NDk0.Ga9eTE.Raix_2C-C7dzkU4FNWBmTNfGKHZr9d7M8ZJUNw")