fx_version "cerulean "

game "gta5"

description "Pallepadehat"

author "Pallepadehat"

client_scripts {
    "config.lua",
    "client.lua"
}

server_scripts {
    "config.lua",
    "server.lua"
}

shared_script '@es_extended/imports.lua'

dependencies {
	'es_extended',
}


ui_page '/ui/nui/standalone/nui/server/app/index.html'

files {'nui/**'}