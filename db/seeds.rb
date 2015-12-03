# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

car = Idea.create(title: "A smaller car!",
            description: "I'd call it a Mini!")
tool = Idea.create(title: "A pocket tool with lots of different tools on it!",
            description: "I'd call it the Jack-of-All-Blades!")
compuphone = Idea.create(title: "A phone and a computer in one device.",
            description: "OMG! How has no one thought of this before? This would totally revolutionize the entire world. I have to get on this one, stat.")
cereal = Idea.create(title: "Cereal for dinner",
            description: "OMG! Why are more people not doing this?")
bluetooth = Idea.create(title: "Bluetooth baby bracelet",
            description: "I'd connect that thing to my phone, and it would tell me if I walk too far from my kid or accidentally leave him in the car!")

tags = ["cars", "think small", "tools", "cool products", "computers", "convenience", "food", "breakfast", "dinner", "technology", "fear", "babies", "parenthood", "lame"]
tags.each{|tag| Tag.create(name: tag)}

car.tags << Tag.where(name: ["cars", "technology", "cool products"])
tool.tags << Tag.where(name: ["tools", "cool products", "think small", "convenience"])
compuphone.tags << Tag.where(name: ["cool products", "computers", "convenience", "technology"])
cereal.tags << Tag.where(name: ["food", "breakfast", "dinner", "parenthood"])
bluetooth.tags << Tag.where(name: ["tools", "cool products", "technology", "fear", "babies", "parenthood"])
