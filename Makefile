DISTRIB := $(shell uname)


all: asciiArt node install  asset framework

install:
	@if [ -x  vendors/asciiArt/figlet222/figlet ] ; then  \
		echo "###########  INSTALL FIGLET ASCIIART  ###########" ;\
		cp vendors/asciiArt/figlet222/figlet bin/ ;\
	fi
	@if [ ! -d tmp ] ; then  \
		mkdir tmp ;\
	fi
	@if [ ! -d bin ] ; then  \
		mkdir bin ;\
	fi
node:
	@if [  -f package.json  ] ; then  \
		echo "###########  NODE JS  MODULES  INSTALATION  ###########" ;\
		npm -d install  ;\
	fi

vendors:
	
asciiArt:
	@if [ ! -d bin ] ; then  \
		mkdir bin ;\
	fi
	@echo "###########  COMPILATION FIGLET ASCIIART  ###########"
	make -C vendors/asciiArt/figlet222/ all

doc:
	./node_modules/.bin/yuidoc -c vendors/yahoo/yuidoc/yuidoc.json -T default


asset:
	./console assets:install 

framework:
	./console router:generate:routes
#	./console ORM2:connections:state
#	./console ORM2:entity:show

clean:
	@if [ -e  bin/figlet ] ; then  \
		echo "###########  CLEAN ASCIIART  ###########" ;\
		make -C vendors/asciiArt/figlet222/ clean; \
	fi
	@if [ -e  node_modules ] ; then \
		echo "###########  CLEAN  NODE MODULES ###########" ;\
		rm -rf node_modules/* ; \
		rm -rf node_modules/.* ; \
	fi

.EXPORT_ALL_VARIABLES:
.PHONY: vendors doc

