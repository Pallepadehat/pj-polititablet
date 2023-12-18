
RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	ESX.PlayerData = xPlayer
	ESX.PlayerLoaded = true
end)

RegisterNetEvent('esx:onPlayerLogout')
AddEventHandler('esx:onPlayerLogout', function()
	ESX.PlayerLoaded = false
	ESX.PlayerData = {}
end)

local function isPlayerPolice()
    local xPlayer = ESX.GetPlayerData()
    return xPlayer and xPlayer.job and xPlayer.job.name == 'police'
end


local function displayNUI(display)
    SendNUIMessage({
        type = "app/setDisplay",
        data = display
    })
    SetNuiFocus(display, display)
end

RegisterKeyMapping("+"..cfg.cmd, "Open "..cfg.resourceName.." NUI", "keyboard", cfg.hotkey)
RegisterCommand("+"..cfg.cmd, function()
    local source = source
    if isPlayerPolice(source) then
        displayNUI(true)
    else
        
    end
end, false)

RegisterCommand(cfg.cmd, function(source, args, raw)
    local source = source
    if isPlayerPolice(source) then
        displayNUI(true)
    else
    end
end, false)

RegisterCommand(cfg.cmd.."_close", function(source, args, raw)
    displayNUI(false)
end)

AddEventHandler("onResourceStop", function(resource)
    if resource == cfg.resourceName then
        displayNUI(false)
    end
end)

RegisterNUICallback("close", function(data, cb)
    displayNUI(false)
    cb(true)
end)

RegisterNUICallback("getPlayerCount", function(data, cb)
    TriggerServerEvent(cfg.resourceName..":getPlayerCount")
    RegisterNetEvent(cfg.resourceName..":getPlayerCount")
    AddEventHandler(cfg.resourceName..":getPlayerCount", function(count)
        cb(count)
    end)
end)

RegisterNUICallback("getServerName", function(data, cb)
    TriggerServerEvent(cfg.resourceName..":getServerName")
    RegisterNetEvent(cfg.resourceName..":getServerName")
    AddEventHandler(cfg.resourceName..":getServerName", function(serverName)
        cb(serverName)
    end)
end)



RegisterNUICallback("getServerName", function(data, cb)
    TriggerServerEvent(cfg.resourceName..":getServerName")
end)
