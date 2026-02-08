                    <button onClick={() => !module.locked && toggleModule(module.id)} disabled={module.locked} className={`w-full flex items-center py-2.5 px-3 transition-all duration-300 text-left group ${
                      module.locked 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'cursor-pointer rounded-2xl hover:bg-white/30'
                    }`}>
                      <div className={`w-10 h-10 shrink-0 flex items-center justify-center mr-3.5 transition-all duration-700 relative ${
                        expandedModuleId === module.id 
                          ? 'scale-110 rounded-full bg-gradient-to-br from-pink-100/80 via-violet-100/80 to-fuchsia-100/80 shadow-[0_0_20px_rgba(236,72,153,0.4),0_0_40px_rgba(139,92,246,0.3)] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-amber-200/50 before:via-transparent before:to-yellow-300/50 before:blur-md before:animate-pulse' 
                          : 'group-hover:text-violet-600'
                      }`}> 
                        <div className="relative z-10">
                          {module.locked ? <Unlock size={18} className="rotate-45 opacity-70" /> : <Icon size={40} />}
                        </div>
                      </div>
                      <div className="flex-1 overflow-hidden"> <span className={`block text-base font-bold truncate transition-colors ${expandedModuleId === module.id ? 'text-[#2E1065]' : 'text-slate-700 group-hover:text-[#2E1065]'}`}>{module.title}</span> </div>
                      {!module.locked && (<div className={`text-slate-300 transition-transform duration-500 ${expandedModuleId === module.id ? 'rotate-180 text-violet-500' : 'group-hover:text-slate-400'}`}> <ChevronDown size={18} /> </div>)}
                    </button>